import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Form } from 'antd';
import { AuthLayout } from '../components/AuthLayout/AuthLayout';
import { useNavigate } from 'react-router-dom';

const signUpSchema = z.object({
    email: z.string()
        .min(3, 'Минимум 3 символа')
        .max(50, 'Максимум 50 символов')
        .email('Введите корректный email'),
    password: z.string()
        .min(8, 'Минимум 8 символов')
        .max(24, 'Максимум 24 символа'),
    passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Пароли не совпадают",
    path: ["passwordConfirm"],
});


// Вытаскиваем типы из схемы для TypeScript
type SignUpFormValues = z.infer<typeof signUpSchema>;

export const SignUp = () => {
    const navigate = useNavigate();

    // Инициализируем форму
    const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema), // Подключаем Zod
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: ''
        }
    });

    // Функция отправки
    const onSubmit = async (data: SignUpFormValues) => {
        console.log('Данные формы валидны!', data);

        try {
            const requestBody = {
                companyName: 'Acme Inc. ' + data.email,
                userName: 'John Doe James Doakes ' + data.email,
                email: data.email,
                password: data.password,
            }

            const response = await fetch("https://cafe-admin-api-production.up.railway.app/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка регистрации. Проверьте данные')
            }

            console.log('Пользователь успешно зарегистрирован')
            navigate('/auth/sign-in')

        } catch (error: any) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <AuthLayout>
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>

                <Form.Item
                    label="Login"
                    required
                    validateStatus={errors.email ? 'error' : ''}
                    help={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <Input {...field} placeholder="Input email" />}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    required
                    validateStatus={errors.password ? 'error' : ''}
                    help={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => <Input.Password {...field} placeholder="Input password" />}
                    />
                </Form.Item>

                <Form.Item
                    label="Password confirmation"
                    required
                    validateStatus={errors.passwordConfirm ? 'error' : ''}
                    help={errors.passwordConfirm?.message}
                >
                    <Controller
                        name="passwordConfirm"
                        control={control}
                        render={({ field }) => <Input.Password {...field} placeholder="Input password again" />}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </AuthLayout>
    );
};