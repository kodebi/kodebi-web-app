import React from "react";
import { Box, Card } from "@kodebi/libkodebi-ui";
import { FaBookOpen, FaUserCircle } from "react-icons/fa";

interface DashboardProps {
  user: string;
  bookCount: number;
  totalLentBooks?: number;
}

export const UserDashboard: React.FC<DashboardProps> = ({ user, bookCount, totalLentBooks }) => {
  return (
    <>
      <Card withBorders shadow="light" margin="0" width="100%" maxWidth="1180px">
        <Box className="dashboard">
          <aside className="user-info">
            <span className="user-pic">
              <FaUserCircle />
            </span>
            <div className="user-name">
              <h3>{user}</h3>
              <p>Aktiv seit 2022</p>
            </div>
          </aside>
          <aside className="user-statistics">
            <article className="stat">
              <h4>Im Regal</h4>
              <span className="stat-iconumber">
                <span className="book-icon">
                  <FaBookOpen />
                </span>
                <h4 className="stat-number">{bookCount}</h4>
              </span>
            </article>
            {totalLentBooks ? (
              <article className="stat">
                <h4>Geliehen/verliehen</h4>
                <span className="stat-iconumber">
                  <span className="book-icon">
                    <FaBookOpen />
                  </span>
                  <h4 className="stat-number">{totalLentBooks}</h4>
                </span>
              </article>
            ) : null}
          </aside>
        </Box>
      </Card>
    </>
  );
};
