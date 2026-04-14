import { type SchemaTypeDefinition } from 'sanity'

import { pilar } from './pilar'
import { project } from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, pilar],
}
