CREATE TYPE application_status AS ENUM ('active', 'inactive');
CREATE TYPE operations_method AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH');

CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status application_status DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE application_draft_schemas(
    id serial NOT NULL,
    application_id integer NOT NULL,
    json jsonb,
    status text NOT NULL DEFAULT 'draft',
    PRIMARY KEY (id) , 
    FOREIGN KEY (application_id) REFERENCES applications(id) ON UPDATE restrict ON DELETE cascade
);

CREATE TABLE application_schemas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    json jsonb,
    application_id INT NOT NULL,
    model_path VARCHAR(500),
    ddl_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

CREATE TABLE operations (
    id SERIAL PRIMARY KEY,
    application_schema_id INT NOT NULL,
    name VARCHAR(255),
    is_authenticated BOOLEAN DEFAULT TRUE,
    is_media BOOLEAN DEFAULT FALSE,
    is_async BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_schema_id) REFERENCES application_schemas(id) ON DELETE CASCADE
);


