import { Card, Tabs } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const activeKey = location.pathname === '/auth/sign-up' ? 'signup' : 'signin';

    return (
        <div className={styles.wrapper}>
            <div className={styles.logoContainer}>
                <img src="/logo/united.png" alt="Pokemon Clicker" className={styles.logo} />
            </div>

            <Card className={styles.card}>
                <Tabs
                    activeKey={activeKey}
                    centered
                    onChange={(key) => {
                        if (key === 'signup') navigate('/auth/sign-up');
                        if (key === 'signin') navigate('/auth/sign-in');
                    }}
                    items={[
                        { key: 'signup', label: 'Sign up' },
                        { key: 'signin', label: 'Sign in' },
                    ]}
                />

                <div style={{ marginTop: '16px' }}>
                    {children}
                </div>
            </Card>
        </div>
    );
};