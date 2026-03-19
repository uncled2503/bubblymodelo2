import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ROYAL_BANKING_API_KEY = Deno.env.get("ROYAL_BANKING_API_KEY");
const ROYAL_BANKING_API_URL = "https://api.royalbanking.com.br/v1/gateway/";
const SUPABASE_PROJECT_URL = Deno.env.get("SUPABASE_URL")?.replace(".co", ".in") || "";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!ROYAL_BANKING_API_KEY) {
    console.error("[create-pix-payment] ROYAL_BANKING_API_KEY secret is not set.");
    return new Response(JSON.stringify({ error: "Configuration error: API key not found." }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { amount, client } = await req.json();

    if (!amount || !client || !client.name || !client.document || !client.telefone || !client.email) {
        return new Response(JSON.stringify({ error: "Missing required fields." }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    const cleanDocument = client.document.replace(/\D/g, '');
    const cleanTelefone = client.telefone.replace(/\D/g, '');

    const payload = {
      "api-key": ROYAL_BANKING_API_KEY,
      amount: amount,
      description: "Cobrança DropShipping",
      client: {
        name: client.name,
        document: cleanDocument,
        telefone: cleanTelefone,
        email: client.email,
      },
      callbackUrl: `${SUPABASE_PROJECT_URL}/functions/v1/handle-payment-webhook`,
    };

    const response = await fetch(ROYAL_BANKING_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok || responseData.status !== 'success') {
      console.error("[create-pix-payment] Error from Royal Banking API:", responseData);
      const errorMessage = responseData.message || "Failed to create PIX payment.";
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log("[create-pix-payment] Successfully created PIX payment.");

    // Return the entire successful response object from the gateway
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("[create-pix-payment] Internal server error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});