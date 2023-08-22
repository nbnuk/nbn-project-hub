export interface OccurrenceListProps {
 
  /**
   * OccurrenceList contents
   */
  label: string;
 
}

/**
 * Primary UI component for user interaction
 */
export const OccurrenceList = ({
  label
}: OccurrenceListProps) => {
  return (
    <p>Hello. {label}</p>
  );
};

export default OccurrenceList
