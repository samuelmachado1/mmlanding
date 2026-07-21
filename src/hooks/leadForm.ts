import { useForm } from 'react-hook-form';
import type { HeroLeadForm } from '../types/index.ts';

export function useFormHero() {
  return useForm<HeroLeadForm>();
}
