"use strict";
import alfy from "alfy";
import data from "../data/kaomojis.json" with { type: "json" };

const formattedData = Object.entries(data).map(([k, v], i) => ({
  id: i + 1,
  body: v,
  title: k,
}));

const items = alfy.inputMatches(formattedData, "title").map((element) => ({
  arg: element.body,
  title: element.body,
  subtitle: element.title,
}));

alfy.output(items);
