import * as React from "react";
import { motion } from "framer-motion";
import { Box, Button, Input, Dropdown, Card, Text } from "@kodebi/libkodebi-ui";

import { LayoutContext } from "../../context/LayoutContext";
import useDiscover from "../../hooks/useDiscover";
import { Shelf, Loading, Alert, Title } from "../../components";
import { LayoutState } from "../../@types/layout";

export const Discover: React.FC = (): JSX.Element => {
  const { alert, loading, closeSubmenu } = React.useContext(LayoutContext) as LayoutState;
  const {
    state: { books, search },
    functions: { backToAll, filterByCategory, filterByLanguage, filterByStatus, handleSearch },
    sets: { categories, lenguajes, status },
  } = useDiscover();

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
      <Title content="Entdecke jetzt neue Bücher" />
      <Card withBorders shadow="light" margin="0" width="100%" maxWidth="1180px">
        <Box variant="center">
          <Text color="#d96c75" padding="0.25rem" fontSize="1.25rem">
            Büchersuche, Filter, etc.
          </Text>
        </Box>
        <Box variant="flexible-flex" padding="0.25rem">
          <Button variant="filter" onClick={backToAll} label="Alle Bücher" />
          <Input
            variant="search"
            name="search"
            id="search"
            width="40vw"
            value={search}
            onChange={handleSearch}
            placeholder="Nach Titel oder Autor*in suchen..."
          />
          <Dropdown
            name="condition"
            id="condition"
            options={categories}
            onChange={filterByCategory}
          />
          <Dropdown
            name="languages"
            id="languages"
            options={lenguajes}
            onChange={filterByLanguage}
          />
          <Dropdown name="status" id="status" options={status} onChange={filterByStatus} />
        </Box>
      </Card>
      <Shelf element={books} />
      {alert.display && <Alert />}
    </motion.main>
  );
};
