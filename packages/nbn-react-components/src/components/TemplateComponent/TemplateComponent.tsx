import '../../index.css'
export interface TemplateComponentProps {
 
  /**
   * TemplateComponent contents
   */
  label: string;
 
}

/**
 * Primary UI component for user interaction
 */
export const TemplateComponent = ({
  label
}: TemplateComponentProps) => {
  return (
    <div role="alert" className="rounded border-s-4 border-slate-500  p-4">
 
  <p className="mt-2 text-sm">
  Hello. {label}
  </p>
</div>
    
  );
};

export default TemplateComponent
