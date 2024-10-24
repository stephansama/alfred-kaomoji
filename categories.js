"use strict";
import alfy from "alfy";
import data from "./categories.json" with { type: "json" };

const formattedData = data.map((t, i) => ({ title: t, id: i }));

const items = alfy
  .inputMatches(formattedData, "title")
  .map((element) => ({ arg: element.title, title: element.title }));

alfy.output(items);
