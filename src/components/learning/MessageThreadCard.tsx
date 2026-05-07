import React from 'react';
import { Button } from '../core/Button';
import { UserRound, Mail } from 'lucide-react';

export interface MessageThreadCardProps {
  from: string;
  subject: string;
  preview: string;
  unread?: boolean;
  onClick?: () => void;
  className?: string;
}

export const MessageThreadCard: React.FC<MessageThreadCardProps> = ({
  from,
  subject,
  preview,
  unread = false,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={[
        'group flex items-start gap-3 p-4 rounded-2xl border bg-white cursor-pointer transition-all',
        'hover:bg-ink-50/50 hover:border-ink-300 hover:-translate-y-px hover:shadow-sm',
        unread ? 'border-primary-200 bg-primary-50/30' : 'border-ink-200',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      <div
        className={[
          'inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-colors',
          unread ? 'bg-primary-100 text-primary-700' : 'bg-ink-100 text-ink-500 group-hover:bg-ink-200',
        ].join(' ')}
      >
        <Mail size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          {unread && (
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-primary-500 shrink-0 shadow-brand-xs animate-pulse" />
          )}
          <h4 className={['m-0 text-body-sm leading-snug truncate', unread ? 'font-bold text-ink-900' : 'font-semibold text-ink-900'].join(' ')}>
            {subject}
          </h4>
        </div>

        <div className="flex items-center gap-1 text-micro text-ink-500 mb-1">
          <UserRound size={11} /> {from}
        </div>

        <p className="m-0 text-body-sm text-ink-500 leading-snug line-clamp-1">{preview}</p>
      </div>

      {onClick && (
        <Button
          size="sm"
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="shrink-0"
        >
          Ouvrir
        </Button>
      )}
    </div>
  );
};

export default MessageThreadCard;
