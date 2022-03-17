import React from "react";
import ReactFlow from "react-flow-renderer";
import { useQuery, gql } from "@apollo/client";
import { Box } from "@primer/components";

export default function BatchsFlow() {
  const { loading, error, data = {} } = useQuery(gql`
    query {
      allIngredientImports {
        id
        _label_
        batchs {
          id
          _label_
          amount
          works {
            id
            by {
              id
              name
            }
          }
        }
      }
    }
  `);
  const { allIngredientImports = [] } = data;
  if (loading) return "...";
  var x = 0;
  var y = 0;
  var elements = [];
  var users = {};
  allIngredientImports.map((imp) => {
    elements.push({
      id: imp.id,
      data: {
        label: imp._label_,
      },
      position: { x, y },
    });
    imp.batchs.map((batch) => {
      elements.push(
        {
          id: batch.id,
          data: {
            label: batch.amount,
          },
          position: { x, y: y + 100 },
        },
        {
          id: imp.id + batch.id,
          source: imp.id,
          target: batch.id,
          animated: true,
        },
      );
      batch.works.map((work) => {
        if (!users[work.by.id]) {
          users[work.by.id] = true;
          elements.push({
            id: work.id,
            data: {
              label: work.by.name,
            },
            position: { x, y: y + 200 },
          });
        }

        elements.push({
          id: batch.id + work.id,
          source: batch.id,
          target: work.id,
        });
      });
      x += 200;
    });
  });
  console.log(elements);
  return (
    <Box px={3} position="relative" height="100%">
      <ReactFlow elements={elements} />
    </Box>
  );
}
