import { privacyPolicyContent } from '../../data/content.ts';
import { Modal } from '../ui/Modal.tsx';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  const { title, lastUpdated, sections } = privacyPolicyContent;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="font-nav text-xs text-gray-500">Última atualização: {lastUpdated}</p>
      <div className="mt-4 space-y-5">
        {sections.map((section) => (
          <section key={section.heading}>
            <h3 className="font-nav text-sm font-bold text-brand-black">{section.heading}</h3>
            <div className="mt-2 space-y-2">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="font-nav text-sm leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Modal>
  );
}
