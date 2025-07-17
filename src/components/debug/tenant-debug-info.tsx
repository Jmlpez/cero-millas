import { useTenant } from '@/hooks/use-tenant';

export const TenantDebugInfo = () => {
    const { tenantIdentifier, isMultiTenant } = useTenant();
    
    // Only show in development
    if (import.meta.env.PROD) return null;
    
    return (
        <div className="fixed bottom-4 right-4 bg-blue-100 dark:bg-blue-900 p-3 rounded-lg shadow-lg border text-sm">
            <div className="font-semibold text-blue-800 dark:text-blue-200">Tenant Debug</div>
            <div className="text-blue-600 dark:text-blue-300">
                <div>Multi-tenant: {isMultiTenant ? 'Yes' : 'No'}</div>
                <div>Tenant: {tenantIdentifier || 'None'}</div>
                <div>URL: {window.location.hostname}</div>
            </div>
        </div>
    );
};
