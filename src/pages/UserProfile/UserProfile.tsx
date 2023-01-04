import * as React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { LayoutContext } from "../../context/LayoutContext";
import { UserDashboard, Loading, Alert, Shelf, Title } from "../../components";
import useUserProfile from "../../hooks/useUserProfile";
import { LayoutState } from "../../@types/layout";

export const UserProfile: React.FC = (): JSX.Element => {
  const { alert, closeSubmenu, loading } = React.useContext(LayoutContext) as LayoutState;
  const { id } = useParams();
  const {
    state: { userBooks },
  } = useUserProfile(id);

  const whoUser = userBooks[0]?.ownerName as string;
  const whose = whoUser?.concat("s");

  return loading ? (
    <Loading />
  ) : (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={closeSubmenu}
    >
      <Title content={`${whose} Profil`} />
      <UserDashboard user={whoUser} bookCount={userBooks?.length} />
      <Shelf element={userBooks} user={whoUser} />
      {alert.display && <Alert />}
    </motion.main>
  );
};
