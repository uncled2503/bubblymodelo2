import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extensão para o jspdf-autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const AdminDashboard = () => {
    const [leads, setLeads] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeads = async () => {
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching leads:', error);
            } else {
                setLeads(data);
            }
        };

        fetchLeads();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Relatório de Leads - Tika Toys", 14, 20);

        const tableColumn = ["Data", "Hora", "Nome", "CPF", "Email", "Telefone"];
        const tableRows = leads.map(lead => [
            new Date(lead.created_at).toLocaleDateString(),
            new Date(lead.created_at).toLocaleTimeString(),
            lead.full_name,
            lead.cpf,
            lead.email,
            lead.phone
        ]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        });

        doc.save('relatorio-leads.pdf');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <img src="/images/logotipo.png" alt="Tika Toys" className="h-12" />
                        <h1 className="text-3xl font-bold">Dashboard de Leads</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button onClick={handleDownloadPDF} variant="outline" disabled={leads.length === 0}>
                            <Download className="mr-2 h-4 w-4" />
                            Salvar em PDF
                        </Button>
                        <Button onClick={handleLogout} variant="destructive">Sair</Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Leads Recebidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Data</TableHead>
                                    <TableHead>Hora</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>CPF</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Telefone</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leads.map((lead) => (
                                    <TableRow key={lead.id}>
                                        <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(lead.created_at).toLocaleTimeString()}</TableCell>
                                        <TableCell>{lead.full_name}</TableCell>
                                        <TableCell>{lead.cpf}</TableCell>
                                        <TableCell>{lead.email}</TableCell>
                                        <TableCell>{lead.phone}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;