import { createContext, useContext, ReactNode, useMemo } from 'react';

interface TenantContextType {
    tenantId: string | null;
    tenantIdentifier: string | null;
    isMultiTenant: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

interface TenantProviderProps {
    children: ReactNode;
}

export const TenantProvider = ({ children }: TenantProviderProps) => {
    const tenantInfo = useMemo(() => {
        // Extract tenant from subdomain
        const hostname = window.location.hostname;
        
        // Check if we're on a subdomain (not just localhost or main domain)
        const parts = hostname.split('.');
        
        // For localhost development: tenant.localhost
        // For production: tenant.yourdomain.com
        let tenantIdentifier: string | null = null;
        
        if (hostname.includes('localhost')) {
            // Development: extract from tenant.localhost
            if (parts.length > 1 && parts[0] !== 'localhost') {
                tenantIdentifier = parts[0];
            }
        } else {
            // Production: extract from tenant.yourdomain.com
            if (parts.length > 2) {
                tenantIdentifier = parts[0];
            }
        }
        
        return {
            tenantId: tenantIdentifier, // You might need to map this to actual tenant ID
            tenantIdentifier,
            isMultiTenant: !!tenantIdentifier
        };
    }, []);

    return (
        <TenantContext.Provider value={tenantInfo}>
            {children}
        </TenantContext.Provider>
    );
};

export const useTenant = (): TenantContextType => {
    const context = useContext(TenantContext);
    if (context === undefined) {
        throw new Error('useTenant must be used within a TenantProvider');
    }
    return context;
};

// Hook for getting tenant-specific API headers
export const useTenantHeaders = (): Record<string, string> => {
    const { tenantIdentifier } = useTenant();
    
    return useMemo(() => {
        const headers: Record<string, string> = {};
        
        if (tenantIdentifier) {
            headers['X-Tenant'] = tenantIdentifier;
        }
        
        return headers;
    }, [tenantIdentifier]);
};
