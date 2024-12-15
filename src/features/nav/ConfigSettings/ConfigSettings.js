import { faGear } from "@fortawesome/free-solid-svg-icons";
import { ApIcon, ApModal } from "components";
import { useState } from "react";

const ConfigSettings = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <ApIcon icon={faGear} size={35} color="var(--primary-dark)" onClick={() => setIsOpenModal(true)} />
      <ApModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </>
  );
};

export default ConfigSettings;
