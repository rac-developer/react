import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  User, 
  Mail, 
  Lock, 
  FileText, 
  Building2, 
  User as UserIcon,
  AlertCircle,
  CheckCircle2,
  Bug
} from 'lucide-react';
import './RegistrationForm.css';
import { registrationSchema, type RegistrationSchema } from '../schemas/registrationSchema';

const RegistrationForm: React.FC = () => {

  const [isSuccess, setIsSuccess] = useState(false);

  // Inicializacion de react hook form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting }
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'Persona',
      rif: ''
    },
    mode: 'onTouched' // Validates fields on blur and on change after first submit
  });

  const selectedUserType = watch('userType');

  // Gestor de envío de formularios, simulacion de una api
  const onSubmit = async (data: RegistrationSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Datos válidos enviados:', data);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  // 4. Simular datos invalidos para demo 
  const simulateInvalidData = async () => {
    setIsSuccess(false);
    setValue('name', 'A'); 
    setValue('email', 'correo-invalido.com');
    setValue('password', '123456');
    setValue('confirmPassword', '12345678');
    setValue('userType', 'Empresa');
    setValue('rif', '12');

    // Dispara la validacion para mostrar todos los errores especificos al instante
    await trigger();
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">Crea tu Cuenta</h1>
          <p className="form-subtitle">Completa los datos para acceder a la plataforma</p>
        </div>

        {isSuccess && (
          <div className="success-message">
            <CheckCircle2 size={24} />
            <div>
              <strong>¡Registro Exitoso!</strong>
              <div style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>Los datos pasaron todas las validaciones de Zod.</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Tipo de Usuario */}
          <div className="form-group">
            <span className="form-label">Tipo de Usuario</span>
            <div className="radio-group">
              <label className="radio-option">
                <input 
                  type="radio" 
                  value="Persona" 
                  {...register('userType')} 
                />
                <div className="radio-label">
                  <UserIcon size={18} /> Persona
                </div>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  value="Empresa" 
                  {...register('userType')} 
                />
                <div className="radio-label">
                  <Building2 size={18} /> Empresa
                </div>
              </label>
            </div>
            {errors.userType && (
              <div className="error-message"><AlertCircle size={14} /> {errors.userType.message}</div>
            )}
          </div>

          {/* Nombre Completo */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">Nombre Completo</label>
            <input
              id="name"
              type="text"
              placeholder="Ej. Juan Pérez"
              className={`form-input ${errors.name ? 'has-error' : ''}`}
              {...register('name')}
            />
            <User className="input-icon" size={18} />
            {errors.name && (
              <div className="error-message"><AlertCircle size={14} /> {errors.name.message}</div>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              className={`form-input ${errors.email ? 'has-error' : ''}`}
              {...register('email')}
            />
            <Mail className="input-icon" size={18} />
            {errors.email && (
              <div className="error-message"><AlertCircle size={14} /> {errors.email.message}</div>
            )}
          </div>

          {/* Contraseña */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`form-input ${errors.password ? 'has-error' : ''}`}
              {...register('password')}
            />
            <Lock className="input-icon" size={18} />
            {errors.password && (
              <div className="error-message"><AlertCircle size={14} /> {errors.password.message}</div>
            )}
          </div>

          {/* Confirmar Contraseña */}
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className={`form-input ${errors.confirmPassword ? 'has-error' : ''}`}
              {...register('confirmPassword')}
            />
            <Lock className="input-icon" size={18} />
            {errors.confirmPassword && (
              <div className="error-message"><AlertCircle size={14} /> {errors.confirmPassword.message}</div>
            )}
          </div>

          {/* Campo Condicional: RIF / Documento Fiscal */}
          {selectedUserType === 'Empresa' && (
            <div className="form-group conditional-field">
              <label className="form-label" htmlFor="rif">RIF / Documento Fiscal</label>
              <input
                id="rif"
                type="text"
                placeholder="Ej. J-12345678-9"
                className={`form-input ${errors.rif ? 'has-error' : ''}`}
                {...register('rif')}
              />
              <FileText className="input-icon" size={18} />
              {errors.rif && (
                <div className="error-message"><AlertCircle size={14} /> {errors.rif.message}</div>
              )}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Validando y Registrando...' : 'Registrar Cuenta'}
          </button>
        </form>

        <button 
          type="button" 
          onClick={simulateInvalidData}
          className="btn btn-simulate"
        >
          <Bug size={18} /> Simular datos inválidos (Zod Demo)
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
