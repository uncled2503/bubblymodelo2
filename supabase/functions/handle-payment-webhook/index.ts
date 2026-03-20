import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    console.log("[handle-payment-webhook] Received webhook payload:", payload);

    const { idTransaction, status } = payload;

    if (!idTransaction || !status) {
      console.error("[handle-payment-webhook] Invalid payload. Missing idTransaction or status.");
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (status === 'paid') {
      const supabaseAdmin = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      // Try to update based on the main transaction ID first
      const { data: mainLead, error: mainError } = await supabaseAdmin
        .from('leads')
        .update({ payment_status: 'paid' })
        .eq('transaction_id', idTransaction)
        .select('id')
        .single();

      // PGRST116 means no rows were found, which is not an error in this case.
      if (mainError && mainError.code !== 'PGRST116') {
        console.error(`[handle-payment-webhook] Error updating lead by main transaction_id ${idTransaction}:`, mainError);
      } else if (mainLead) {
        console.log(`[handle-payment-webhook] Successfully updated lead for main transaction ${idTransaction} to 'paid'.`);
      } else {
        // If no lead was updated, try updating based on the upsell transaction ID
        const { error: upsellError } = await supabaseAdmin
          .from('leads')
          .update({ upsell_payment_status: 'paid' })
          .eq('upsell_transaction_id', idTransaction);

        if (upsellError) {
          console.error(`[handle-payment-webhook] Error updating lead by upsell_transaction_id ${idTransaction}:`, upsellError);
        } else {
          console.log(`[handle-payment-webhook] Successfully updated lead for upsell transaction ${idTransaction} to 'paid'.`);
        }
      }
    } else {
        console.log(`[handle-payment-webhook] Received non-paid status '${status}' for transaction ${idTransaction}. No action taken.`);
    }

    // As per Royal Banking docs, respond with HTTP 200 and a JSON-encoded 200.
    return new Response(JSON.stringify(200), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("[handle-payment-webhook] Error processing webhook:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});