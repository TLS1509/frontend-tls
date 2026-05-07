import React from 'react';
import { Button } from '../core/Button';
import { UserRound } from 'lucide-react';

export interface MessageThreadCardProps {
  from: string;
  subject: string;
  preview: string;
  onClick?: () => void;
  className?: string;
}

export const MessageThreadCard: React.FC<MessageThreadCardProps> = ({
  from,
  subject,
  preview,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={[
        'flex items-start gap-3 p-3 rounded-md border border-ink-200 bg-white cursor-pointer transition-all',
        'hover:bg-ink-50 hover:border-ink-300',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      <div className="flex-1 min-w-0">
        <h4 className="m-0 mb-1 text-body-sm font-semibold text-ink-900">{subject}</h4>

        <div className="flex items-center gap-1 text-micro text-ink-500 mb-2">
          <UserRound size={12} /> {from}
        </div>

        <p className="m-0 text-body-sm text-ink-500 leading-snug truncate">{preview}</p>
      </div>

      {onClick && (
        <Button
          size="sm"
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Ouvrir
        </Button>
      )}
    </div>
  );
};

export default MessageThreadCard;
