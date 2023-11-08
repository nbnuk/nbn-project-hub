import { format } from "date-fns";


interface NBNDateProps {
    timestamp: number | undefined;
    missing?: string;
  }

export const NBNDate  = ({ timestamp, missing = "" }: NBNDateProps) => (
    timestamp ? <>{format(new Date(timestamp), 'yyyy-MM-dd')} </>: <>{missing}</>
)

export default NBNDate