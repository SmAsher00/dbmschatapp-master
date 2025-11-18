# Database ER Diagram - Chat Application

## Entity-Relationship Diagram

```
┌─────────────────────────────────┐
│            USER                 │
├─────────────────────────────────┤
│ _id (PK)                        │
│ email (UNIQUE, NOT NULL)        │
│ fullName (NOT NULL)             │
│ password                        │
│ profilePic                      │
│ createdAt (timestamp)           │
│ updatedAt (timestamp)           │
└─────────────────────────────────┘
         │                    │
         │                    │
    (1)  │                    │  (1)
         │                    │
         ▼                    ▼
┌─────────────────────────────────┐
│          MESSAGE                │
├─────────────────────────────────┤
│ _id (PK)                        │
│ senderId (FK → User._id)        │
│ receiverId (FK → User._id)     │
│ text                            │
│ image                           │
│ createdAt (timestamp)           │
│ updatedAt (timestamp)           │
└─────────────────────────────────┘
```

## Relationships

### User ↔ Message Relationship

- **One-to-Many (1:N)**: One User can send many Messages
  - Relationship: `User (1) ────< sends >─── (N) Message`
  - Foreign Key: `Message.senderId` references `User._id`

- **One-to-Many (1:N)**: One User can receive many Messages
  - Relationship: `User (1) ────< receives >─── (N) Message`
  - Foreign Key: `Message.receiverId` references `User._id`

## Entity Details

### 1. USER Entity

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| _id | ObjectId | PRIMARY KEY, AUTO | Unique identifier |
| email | String | UNIQUE, NOT NULL | User's email address |
| fullName | String | NOT NULL | User's full name |
| password | String | DEFAULT: "" | Hashed password |
| profilePic | String | DEFAULT: "" | URL to profile picture |
| createdAt | Date | AUTO | Timestamp of creation |
| updatedAt | Date | AUTO | Timestamp of last update |

**Cardinality**: One User can send/receive multiple Messages

### 2. MESSAGE Entity

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| _id | ObjectId | PRIMARY KEY, AUTO | Unique identifier |
| senderId | ObjectId | FOREIGN KEY, NOT NULL | References User._id (sender) |
| receiverId | ObjectId | FOREIGN KEY, NOT NULL | References User._id (receiver) |
| text | String | OPTIONAL | Message text content |
| image | String | OPTIONAL | URL to image attachment |
| createdAt | Date | AUTO | Timestamp of creation |
| updatedAt | Date | AUTO | Timestamp of last update |

**Cardinality**: 
- Each Message has exactly one sender (User)
- Each Message has exactly one receiver (User)

## Relationship Cardinality Summary

```
USER (1) ──────── sends ──────── (N) MESSAGE
USER (1) ──────── receives ──── (N) MESSAGE
```

- **Total Relationship**: Many-to-Many between Users through Messages
  - User A can send messages to User B
  - User B can send messages to User A
  - This creates a bidirectional communication channel

## Database Schema (MongoDB/Mongoose)

### User Schema
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  fullName: String (required),
  password: String,
  profilePic: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Message Schema
```javascript
{
  _id: ObjectId,
  senderId: ObjectId (ref: 'User', required),
  receiverId: ObjectId (ref: 'User', required),
  text: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Key Design Decisions

1. **No Conversation/Thread Entity**: Messages are directly linked between two users
   - Conversations are derived by querying messages between two specific users
   - Simpler schema, but may require more queries for conversation management

2. **Bidirectional Messaging**: 
   - Both `senderId` and `receiverId` are stored
   - Allows easy querying of sent and received messages

3. **Optional Text/Image**: 
   - Messages can contain text, image, or both
   - Flexible content structure

4. **Timestamps**: 
   - Automatic `createdAt` and `updatedAt` for audit trail
   - Useful for message ordering and display

## Query Patterns

### Common Queries:
1. **Get all messages between two users**:
   ```javascript
   Message.find({
     $or: [
       { senderId: user1Id, receiverId: user2Id },
       { senderId: user2Id, receiverId: user1Id }
     ]
   }).sort({ createdAt: 1 })
   ```

2. **Get all users (for sidebar)**:
   ```javascript
   User.find({ _id: { $ne: currentUserId } })
   ```

3. **Get user by email**:
   ```javascript
   User.findOne({ email: userEmail })
   ```

