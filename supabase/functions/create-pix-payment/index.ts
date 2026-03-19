import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ATENÇÃO: A API Key da Royal Banking deve ser configurada como um segredo no seu projeto Supabase.
// O nome do segredo deve ser ROYAL_BANKING_API_KEY
const ROYAL_BANKING_API_KEY = Deno.env.get("ROYAL_BANKING_API_KEY");
const ROYAL_BANKING_API_URL = "https://api.royalbanking.com.br/v1/gateway/";

// A URL base do seu projeto Supabase.
const SUPABASE_PROJECT_URL = Deno.env.get("SUPABASE_URL")?.replace(".co", ".in") || "";

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!ROYAL_BANKING_API_KEY) {
    console.error("[create-pix-payment] ROYAL_BANKING_API_KEY secret is not set in Supabase project.");
    return new Response(JSON.stringify({ error: "Configuration error: API key not found." }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { amount, client } = await req.json();

    // Basic validation
    if (!amount || !client || !client.name || !client.document || !client.telefone || !client.email) {
        return new Response(JSON.stringify({ error: "Missing required fields." }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    // A API espera CPF e telefone sem formatação
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

    console.log("[create-pix-payment] Sending payload to Royal Banking:", JSON.stringify(payload, null, 2));

    const response = await fetch(ROYAL_BANKING_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok || responseData.status !== 'success') {
      console.error("[create-pix-payment] Error from Royal Banking API:", responseData);
      return new Response(JSON.stringify({ error: responseData.message || "Failed to create PIX payment." }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log("[create-pix-payment] Successfully created PIX payment.");

    return new Response(JSON.stringify(responseData), {
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