import { useEffect, useMemo, useRef, useState } from "react";

// cardData: from, to, name, description, color, important, count
export default function useCardStatus(cardData) {
  // Card controls
  const cardRef = useRef(null);

  // Card status
  const [status, setStatus] = useState({
    isHover: false,
    isFocus: false,
    isEdit: false,
    isColor: false,
    isFrom: false,
    isTo: false,
    preview: null,
  });

  // Card data
  const [data, setData] = useState(cardData);

  // Card visible
  const visible = useMemo(() => {
    return {
      showUpdate: status.isEdit,
      showCount: !status.isHover && !status.isEdit && data.count,
      showDelete: (status.isHover || status.isFocus) && !status.isEdit,
      showColorAndEdit: (status.isFocus && !status.isEdit) || status.isColor,
    };
  }, [status, data]);

  // Support functions
  const updateStatus = (newStatus) => {
    setStatus((prevStatus) => ({ ...prevStatus, ...newStatus }));
  };

  const updateData = (newData) => {
    setData((prevInfo) => ({ ...prevInfo, ...newData }));
  };

  // Reset data on escape edit
  useEffect(() => {
    if (!status.isEdit) setData(cardData);
  }, [status.isEdit]);

  // Return data & interaction
  return {
    cardRef,
    status,
    data,
    visible,
    updateStatus,
    updateData,
  };
}
