import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from "./SideBlock";
import {useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// [...new Set(items)]

export const TagsBlock = ({ items, isLoading = true }) => {
  const navigate = useNavigate();
  const uniqueItems = [...new Set(items.map(item => item.toLowerCase()))];
console.log(uniqueItems);
  return (
    <SideBlock title="Filter by tags">
      <List>
        {(isLoading ? [...Array(5)] : uniqueItems).map((name, i) => (
          <a
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => navigate(`/tags/${name}`)}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
      <List>
      <Button onClick={() => navigate('/')} >Reset</Button>
      </List>
    </SideBlock>
  );
};
