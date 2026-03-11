import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Form } from 'antd';
import { AuthLayout } from '../components/AuthLayout/AuthLayout';

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
    // Инициализируем форму
    const { control, handleSubmit, formState: { errors } } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema), // Подключаем Zod
        defaultValues: {
            email: '',
            password: '',
        }
    });

    // Функция отправки
    const onSubmit = (data: SignInFormValues) => {
        console.log('Данные формы валидны!', data);
        // Тут в будущем будет запрос к API
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