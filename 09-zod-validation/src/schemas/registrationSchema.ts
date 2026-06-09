
import * as z from 'zod';

// 1. Definición del esquema zod
export const registrationSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .regex(/[^a-zA-Z0-9]/, 'Debe contener al menos un carácter especial (ej. !@#$)'),
  confirmPassword: z.string(),
  userType: z.enum(['Persona', 'Empresa'], {
    message: 'Debes seleccionar el tipo de usuario'
  }),
  rif: z.string().optional()
})
// 2. Refinamientos
.refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
})
// 3. Validacion condicional
.refine((data) => {
  if (data.userType === 'Empresa') {
    return !!data.rif && data.rif.trim().length >= 6;
  }
  return true;
}, {
  message: 'El RIF o Documento Fiscal es obligatorio para empresas (mínimo 6 caracteres)',
  path: ['rif']
});

// Infer the TypeScript type from the schema
export type RegistrationSchema = z.infer<typeof registrationSchema>;
