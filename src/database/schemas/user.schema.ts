import { User } from 'src/core/entities';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  tableName: 'users',
  columns: {
    id: {
      generated: true,
      type: 'integer',
      primary: true,
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
    username: {
      type: 'varchar',
    },
    createdAt: {
      type: 'timestamptz',
      createDate: true,
      name: 'created_at',
    },
    updatedAt: {
      type: 'timestamptz',
      updateDate: true,
      name: 'updated_at',
    },
  },
});
