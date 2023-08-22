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
    <p>Hello. {label}</p>
  );
};

export default TemplateComponent
