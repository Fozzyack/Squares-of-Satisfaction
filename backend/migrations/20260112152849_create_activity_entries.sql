-- +goose Up
-- +goose StatementBegin
CREATE TABLE activity_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    completed_at DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

CREATE INDEX idx_activity_entries_activity_id ON activity_entries(activity_id);
CREATE INDEX idx_activity_entries_user_id ON activity_entries(user_id);
CREATE INDEX idx_activity_entries_completed_at ON activity_entries(completed_at);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS activity_entries;
-- +goose StatementEnd
