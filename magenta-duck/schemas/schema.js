import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import  Songs  from "./Songs";
import Music from './Music';
export default createSchema({
  name: 'default',
  types: schemaTypes.concat([Songs,Music]),
})
