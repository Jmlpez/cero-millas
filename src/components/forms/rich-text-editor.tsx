import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@ui/button';
import { cn } from '@utils';
import {
    LucideBold,
    LucideHeading1,
    LucideHeading2,
    LucideItalic,
    LucideList,
    LucideListOrdered,
    LucideMinus,
    LucideQuote,
    LucideRedo,
    LucideUndo,
} from 'lucide-react';
import { useCallback, useEffect } from 'react';

interface RichTextEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    error?: boolean;
    className?: string;
    disabled?: boolean;
}

export const RichTextEditor = ({
    value = '',
    onChange,
    placeholder = 'Escribe aquí...',
    error = false,
    className,
    disabled = false,
}: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
        ],
        content: value,
        editable: !disabled,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange?.(html);
        },
        editorProps: {
            attributes: {
                class: cn('min-h-[150px] max-w-none p-3 focus:outline-none', 'editor-content'),
            },
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, false);
        }
    }, [editor, value]);

    const toggleBold = useCallback(() => {
        editor?.chain().focus().toggleBold().run();
    }, [editor]);

    const toggleItalic = useCallback(() => {
        editor?.chain().focus().toggleItalic().run();
    }, [editor]);

    const toggleBulletList = useCallback(() => {
        editor?.chain().focus().toggleBulletList().run();
    }, [editor]);

    const toggleOrderedList = useCallback(() => {
        editor?.chain().focus().toggleOrderedList().run();
    }, [editor]);

    const toggleHeading1 = useCallback(() => {
        editor?.chain().focus().toggleHeading({ level: 1 }).run();
    }, [editor]);

    const toggleHeading2 = useCallback(() => {
        editor?.chain().focus().toggleHeading({ level: 2 }).run();
    }, [editor]);

    const toggleBlockquote = useCallback(() => {
        editor?.chain().focus().toggleBlockquote().run();
    }, [editor]);

    const toggleHorizontalRule = useCallback(() => {
        editor?.chain().focus().setHorizontalRule().run();
    }, [editor]);

    const undo = useCallback(() => {
        editor?.chain().focus().undo().run();
    }, [editor]);

    const redo = useCallback(() => {
        editor?.chain().focus().redo().run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div
            className={cn('rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800', error && 'border-error-500', className)}
        >
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 p-2 dark:border-gray-700">
                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={toggleBold}
                        disabled={disabled}
                        className={cn('h-8 w-8 p-0', editor.isActive('bold') && 'bg-gray-100 dark:bg-gray-700')}
                    >
                        <LucideBold className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={toggleItalic}
                        disabled={disabled}
                        className={cn('h-8 w-8 p-0', editor.isActive('italic') && 'bg-gray-100 dark:bg-gray-700')}
                    >
                        <LucideItalic className="h-4 w-4" />
                    </Button>
                </div>

                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />

                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={toggleHeading1}
                        disabled={disabled}
                        className={cn('h-8 w-8 p-0', editor.isActive('heading', { level: 1 }) && 'bg-gray-100 dark:bg-gray-700')}
                    >
                        <LucideHeading1 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={toggleHeading2}
                        disabled={disabled}
                        className={cn('h-8 w-8 p-0', editor.isActive('heading', { level: 2 }) && 'bg-gray-100 dark:bg-gray-700')}
                    >
                        <LucideHeading2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />

                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={toggleBulletList}
                        disabled={disabled}
                        className={cn('h-8 w-8 p-0', editor.isActive('bulletList') && 'bg-gray-100 dark:bg-gray-700')}
                    >
                        <LucideList className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={toggleOrderedList}
                        disabled={disabled}
                        className={cn('h-8 w-8 p-0', editor.isActive('orderedList') && 'bg-gray-100 dark:bg-gray-700')}
                    >
                        <LucideListOrdered className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={toggleBlockquote}
                        disabled={disabled}
                        className={cn('h-8 w-8 p-0', editor.isActive('blockquote') && 'bg-gray-100 dark:bg-gray-700')}
                    >
                        <LucideQuote className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={toggleHorizontalRule}
                        disabled={disabled}
                        className="h-8 w-8 p-0"
                        title="Separador horizontal"
                    >
                        <LucideMinus className="h-4 w-4" />
                    </Button>
                </div>

                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />

                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={undo}
                        disabled={disabled || !editor.can().undo()}
                        className="h-8 w-8 p-0"
                    >
                        <LucideUndo className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={redo}
                        disabled={disabled || !editor.can().redo()}
                        className="h-8 w-8 p-0"
                    >
                        <LucideRedo className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Editor Content */}
            <EditorContent
                editor={editor}
                className={cn('min-h-[120px]', disabled && 'opacity-50')}
                placeholder={placeholder}
                // onChange={}
            />
        </div>
    );
};
