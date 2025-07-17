import { cn } from '@utils';
import DOMPurify from 'dompurify';

interface HtmlContentProps {
    content: string;
    className?: string;
}

export const HtmlContent = ({ content, className }: HtmlContentProps) => {
    // Sanitize HTML before rendering
    const sanitizedContent = DOMPurify.sanitize(content, {
        // Allow only the tags you need
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'strike', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'hr', 'a'],
        // Allow only these attributes
        ALLOWED_ATTR: ['href', 'title', 'target'],
        // Additional security configurations
        FORBID_ATTR: ['style', 'class', 'id'],
        FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'form', 'input'],
        // Ensure links open in new tab
        ADD_ATTR: ['target'],
        // Clean malicious content
        SANITIZE_DOM: true,
        SANITIZE_NAMED_PROPS: true,
        KEEP_CONTENT: true,
    });

    return (
        <div
            className={cn('editor-content', className)}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    );
};
