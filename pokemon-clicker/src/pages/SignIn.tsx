import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Form } from 'antd';
import { AuthLayout } from '../components/AuthLayout/AuthLayout';
import { useNavigate } from 'react-router-dom';

const signInSchema = z.object({
    email: z.string()
        .min(3, 'Минимум 3 символа')
        .max(50, 'Максимум 50 символов')
        .email('Введите корректный email'),
    password: z.string()
        .min(8, 'Минимум 8 символов')
        .max(24, 'Максимум 24 символа'),
});

// Вытаскиваем типы из схемы для TypeScript
type SignInFormValues = z.infer<typeof signInSchema>;

export const SignIn = () => {
    const navigate = useNavigate();

    // Инициализируем форму
    const { control, handleSubmit, formState: { errors } } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema), // Подключаем Zod
        defaultValues: {
            email: '',
            password: '',
        }
    });

    // Функция отправки
    const onSubmit = async (data: SignInFormValues) => {
        console.log('Данные формы валидны!');

        try {
            const requestBody = {
                email: data.email,
                password: data.password,
            }

            const response = await fetch("https://cafe-admin-api-production.up.railway.app/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка авторизации. Проверьте данные')
            }

            const responseData = await response.json();
            const token = responseData.access_token;

            if (token) {
                localStorage.setItem('pokemon_auth_token', token);
                localStorage.setItem('pokemon_user_email', data.email);
                console.log('Пользователь успешно авторизован')
                navigate('/')
            } else {
                throw new Error('Токен не найден в ответе сервера')
            }
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

                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                        Sign in
                    </Button>
                </Form.Item>
            </Form>
        </AuthLayout>
    )
}