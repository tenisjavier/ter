import { createClient } from "@supabase/supabase-js";

const createLeadInSupabase = async (
  lead: {
    name: string;
    company?: string;
    email: string;
    motive?: string;
    phone: string;
    message?: string;
    last_name?: string;
    rut?: string;
    interest_area?: string;
    comuna?: string;
    propertyId?: string;
    propertyAddress?: string;
    propertyComuna?: string;
  },
  table: string
) => {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );

    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          name: lead.name,
          ...(lead.company && { company: lead.company }),
          email: lead.email,
          ...(lead.motive && { motive: lead.motive }),
          phone: lead.phone,
          ...(lead.message && { message: lead.message }),
          ...(lead.last_name && { last_name: lead.last_name }),
          ...(lead.rut && { rut: lead.rut }),
          ...(lead.interest_area && { interest_area: lead.interest_area }),
          ...(lead.comuna && { comuna: lead.comuna }),
          ...(lead.propertyId && { property_id: lead.propertyId }),
          ...(lead.propertyAddress && {
            property_address: lead.propertyAddress,
          }),
          ...(lead.propertyComuna && { property_comuna: lead.propertyComuna }),
        },
      ])
      .select();
    console.log("data", data);
    if (error) {
      console.log("error", error);
    }
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export default createLeadInSupabase;
