import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white">
      <Header />
      <main className="container max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Política de Privacidade</h1>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p>
            A sua privacidade é importante para nós. É política do Tika Toys respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Tika Toys, e outros sites que possuímos e operamos.
          </p>
          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
          </p>
          <h2 className="text-2xl font-bold mt-6 mb-4">1. Informações que coletamos</h2>
          <p>Coletamos informações que você nos fornece diretamente. Por exemplo, coletamos informações quando você cria uma conta, se inscreve, participa de quaisquer recursos interativos de nossos serviços, preenche um formulário, solicita suporte ao cliente ou se comunica conosco de outra forma.</p>
          <h2 className="text-2xl font-bold mt-6 mb-4">2. Uso de informações</h2>
          <p>Usamos as informações que coletamos para fornecer, manter e melhorar nossos serviços, como para administrar sua conta, processar transações e enviar informações relacionadas, incluindo confirmações e faturas.</p>
          <h2 className="text-2xl font-bold mt-6 mb-4">3. Compartilhamento de informações</h2>
          <p>Não compartilhamos suas informações pessoais com terceiros, exceto conforme descrito nesta política de privacidade. Podemos compartilhar informações com fornecedores, consultores e outros prestadores de serviços que precisam de acesso a tais informações para realizar trabalhos em nosso nome.</p>
          <h2 className="text-2xl font-bold mt-6 mb-4">4. Segurança</h2>
          <p>Tomamos medidas razoáveis para ajudar a proteger informações sobre você contra perda, roubo, uso indevido e acesso não autorizado, divulgação, alteração e destruição.</p>
          <p>Se tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em <Link to="/contato" className="text-teal-500 hover:underline">contato conosco</Link>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;