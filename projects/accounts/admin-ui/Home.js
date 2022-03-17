import React from "react";
import { Box } from "@primer/components";
import Calendar from "react-awesome-calendar";
import { useQuery, gql } from "@apollo/client";
export default function Home() {
  const { loading, error, data = {} } = useQuery(gql`
    query {
      allWorks {
        id
        from
        to
        content
      }
    }
  `);
  const { allCards = [] } = data;
  const events = allCards.map((work) => ({
    color: work.board.color,
    from: new Date(work.from).toISOString(),
    to: new Date(work.to).toISOString(),
    title: work.content,
  }));
  console.log(allCards, events);
  return (
    <Box px={3}>
      <Calendar events={events} />
    </Box>
  );
}
function dates(start, end) {
  var arr = new Array();
  var dt = new Date(start);
  while (dt <= end) {
    rr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
}
