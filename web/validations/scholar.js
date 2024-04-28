import { z } from 'zod'
import { isRequired } from ".";

export const scholarSchema = z.object({
    guide: z.string().nullable(),
    name: isRequired('Name is required'),
    register_number: isRequired('Register number is required'),
    study_type: z.enum(['FT', 'PT']).nullable(), // Assuming 'FT' for full-time and 'PT' for part-time
    fellowship: z.string().nullable(),
    registration_date: isRequired('Registration date is required'), // Assuming date format (e.g., DD-MM-YYYY)
    viva_voice_date: z.string().nullable(), // Assuming date format (e.g., DD-MM-YYYY)
    status: z.enum([true, false]).nullable(), // Assuming 'true' for completed and 'false' for not completed
    gender: z.string().nullable(),
    category: z.string().nullable(),
    pg_college: z.string().nullable(),
    ug_college: z.string().nullable(),
    university: isRequired('University is required'),
    research_title: z.string().nullable(),
    working_at_ssn: z.string().nullable(),
    pg_graduating_year: z.string().nullable(), // Assuming string format (e.g., 'YYYY')
    status_of_research: z.string().nullable(),
    ug_graduating_year: z.string().nullable(), // Assuming string format (e.g., 'YYYY')
});
