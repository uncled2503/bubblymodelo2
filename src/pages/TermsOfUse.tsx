import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TermsOfUse = () => {
  return (
    <div className="bg-white">
      <Header />
      <main className="container max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Termos de Uso</h1>
        <div className="prose prose-lg max-w-none text-gray-600">
          <h2 className="text-2xl font-bold mt-6 mb-4">1. Termos</h2>
          <p>
            Ao acessar ao site Tika Toys, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
          </p>
          <h2 className="text-2xl font-bold mt-6 mb-4">2. Uso de Licença</h2>
          <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Tika Toys , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:</p>
          <ol className="list-decimal list-inside space-y-2 pl-5">
              <li>modificar ou copiar os materiais;</li>
              <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
              <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Tika Toys;</li>
              <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
              <li>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
          </ol>
          <h2 className="text-2xl font-bold mt-6 mb-4">3. Isenção de responsabilidade</h2>
          <p>Os materiais no site da Tika Toys são fornecidos 'como estão'. Tika Toys não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
          <h2 className="text-2xl font-bold mt-6 mb-4">4. Limitações</h2>
          <p>Em nenhum caso o Tika Toys ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Tika Toys, mesmo que Tika Toys ou um representante autorizado da Tika Toys tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUse;