#!/usr/bin/env node
import { program } from "./program";

import './init';
import './configure';
import './doctor';

program.parse(process.argv);

export default program;