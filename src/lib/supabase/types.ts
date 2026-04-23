// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.1'
  }
  public: {
    Tables: {
      avaliacoes: {
        Row: {
          avaliador_id: string | null
          colaborador_id: string
          created_at: string
          id: string
          nota_pontualidade: number
          nota_qualidade: number
          nota_trabalho_equipe: number
          observacoes: string | null
          organization_id: string
          periodo: string
        }
        Insert: {
          avaliador_id?: string | null
          colaborador_id: string
          created_at?: string
          id?: string
          nota_pontualidade: number
          nota_qualidade: number
          nota_trabalho_equipe: number
          observacoes?: string | null
          organization_id: string
          periodo: string
        }
        Update: {
          avaliador_id?: string | null
          colaborador_id?: string
          created_at?: string
          id?: string
          nota_pontualidade?: number
          nota_qualidade?: number
          nota_trabalho_equipe?: number
          observacoes?: string | null
          organization_id?: string
          periodo?: string
        }
        Relationships: [
          {
            foreignKeyName: 'avaliacoes_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_avaliacoes_avaliador'
            columns: ['avaliador_id']
            isOneToOne: false
            referencedRelation: 'colaboradores'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_avaliacoes_colaborador'
            columns: ['colaborador_id']
            isOneToOne: false
            referencedRelation: 'colaboradores'
            referencedColumns: ['id']
          },
        ]
      }
      colaboradores: {
        Row: {
          cargo: string | null
          cpf: string | null
          created_at: string
          data_admissao: string | null
          data_nascimento: string | null
          departamento: string | null
          documentos_urls: Json | null
          email: string | null
          endereco: string | null
          id: string
          image_gender: string | null
          nome: string
          organization_id: string
          rg: string | null
          role: string
          salario: number | null
          status: string | null
          telefone: string | null
          tipo_contrato: string | null
          user_id: string | null
        }
        Insert: {
          cargo?: string | null
          cpf?: string | null
          created_at?: string
          data_admissao?: string | null
          data_nascimento?: string | null
          departamento?: string | null
          documentos_urls?: Json | null
          email?: string | null
          endereco?: string | null
          id?: string
          image_gender?: string | null
          nome: string
          organization_id: string
          rg?: string | null
          role?: string
          salario?: number | null
          status?: string | null
          telefone?: string | null
          tipo_contrato?: string | null
          user_id?: string | null
        }
        Update: {
          cargo?: string | null
          cpf?: string | null
          created_at?: string
          data_admissao?: string | null
          data_nascimento?: string | null
          departamento?: string | null
          documentos_urls?: Json | null
          email?: string | null
          endereco?: string | null
          id?: string
          image_gender?: string | null
          nome?: string
          organization_id?: string
          rg?: string | null
          role?: string
          salario?: number | null
          status?: string | null
          telefone?: string | null
          tipo_contrato?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'colaboradores_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          },
        ]
      }
      ferias: {
        Row: {
          colaborador_id: string | null
          created_at: string
          data_fim: string
          data_inicio: string
          id: string
          observacoes: string | null
          organization_id: string
          status: string | null
        }
        Insert: {
          colaborador_id?: string | null
          created_at?: string
          data_fim: string
          data_inicio: string
          id?: string
          observacoes?: string | null
          organization_id: string
          status?: string | null
        }
        Update: {
          colaborador_id?: string | null
          created_at?: string
          data_fim?: string
          data_inicio?: string
          id?: string
          observacoes?: string | null
          organization_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'ferias_colaborador_id_fkey'
            columns: ['colaborador_id']
            isOneToOne: false
            referencedRelation: 'colaboradores'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'ferias_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          nome: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          nome: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      ponto: {
        Row: {
          colaborador_id: string | null
          created_at: string
          data: string
          hora_entrada: string | null
          hora_saida: string | null
          id: string
          organization_id: string
        }
        Insert: {
          colaborador_id?: string | null
          created_at?: string
          data: string
          hora_entrada?: string | null
          hora_saida?: string | null
          id?: string
          organization_id: string
        }
        Update: {
          colaborador_id?: string | null
          created_at?: string
          data?: string
          hora_entrada?: string | null
          hora_saida?: string | null
          id?: string
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'ponto_colaborador_id_fkey'
            columns: ['colaborador_id']
            isOneToOne: false
            referencedRelation: 'colaboradores'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'ponto_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          },
        ]
      }
      recrutamento: {
        Row: {
          created_at: string
          curriculo_url: string | null
          email: string | null
          id: string
          image_gender: string | null
          nome_candidato: string
          organization_id: string
          status: string
          telefone: string | null
          vaga: string
          vaga_id: string | null
        }
        Insert: {
          created_at?: string
          curriculo_url?: string | null
          email?: string | null
          id?: string
          image_gender?: string | null
          nome_candidato: string
          organization_id: string
          status: string
          telefone?: string | null
          vaga: string
          vaga_id?: string | null
        }
        Update: {
          created_at?: string
          curriculo_url?: string | null
          email?: string | null
          id?: string
          image_gender?: string | null
          nome_candidato?: string
          organization_id?: string
          status?: string
          telefone?: string | null
          vaga?: string
          vaga_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'recrutamento_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'recrutamento_vaga_id_fkey'
            columns: ['vaga_id']
            isOneToOne: false
            referencedRelation: 'vagas'
            referencedColumns: ['id']
          },
        ]
      }
      vagas: {
        Row: {
          created_at: string
          departamento: string | null
          descricao: string | null
          id: string
          organization_id: string
          requisitos: string | null
          salario: number | null
          status: string | null
          tipo_contrato: string | null
          titulo: string
        }
        Insert: {
          created_at?: string
          departamento?: string | null
          descricao?: string | null
          id?: string
          organization_id: string
          requisitos?: string | null
          salario?: number | null
          status?: string | null
          tipo_contrato?: string | null
          titulo: string
        }
        Update: {
          created_at?: string
          departamento?: string | null
          descricao?: string | null
          id?: string
          organization_id?: string
          requisitos?: string | null
          salario?: number | null
          status?: string | null
          tipo_contrato?: string | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: 'vagas_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_org_id: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: avaliacoes
//   id: uuid (not null, default: gen_random_uuid())
//   created_at: timestamp with time zone (not null, default: timezone('utc'::text, now()))
//   colaborador_id: uuid (not null)
//   avaliador_id: uuid (nullable)
//   periodo: text (not null)
//   nota_pontualidade: smallint (not null)
//   nota_qualidade: smallint (not null)
//   nota_trabalho_equipe: smallint (not null)
//   observacoes: text (nullable)
//   organization_id: uuid (not null)
// Table: colaboradores
//   id: uuid (not null, default: gen_random_uuid())
//   created_at: timestamp with time zone (not null, default: timezone('utc'::text, now()))
//   nome: text (not null)
//   cpf: text (nullable)
//   rg: text (nullable)
//   data_nascimento: date (nullable)
//   endereco: text (nullable)
//   email: text (nullable)
//   telefone: text (nullable)
//   cargo: text (nullable)
//   departamento: text (nullable)
//   data_admissao: date (nullable)
//   salario: numeric (nullable)
//   tipo_contrato: text (nullable)
//   status: text (nullable, default: 'Ativo'::text)
//   documentos_urls: jsonb (nullable, default: '[]'::jsonb)
//   image_gender: text (nullable, default: 'male'::text)
//   role: text (not null, default: 'Colaborador'::text)
//   user_id: uuid (nullable)
//   organization_id: uuid (not null)
// Table: ferias
//   id: uuid (not null, default: gen_random_uuid())
//   created_at: timestamp with time zone (not null, default: timezone('utc'::text, now()))
//   colaborador_id: uuid (nullable)
//   data_inicio: date (not null)
//   data_fim: date (not null)
//   status: text (nullable, default: 'Pendente'::text)
//   observacoes: text (nullable)
//   organization_id: uuid (not null)
// Table: organizations
//   id: uuid (not null, default: gen_random_uuid())
//   nome: text (not null)
//   created_at: timestamp with time zone (not null, default: timezone('utc'::text, now()))
//   created_by: uuid (nullable, default: auth.uid())
// Table: ponto
//   id: uuid (not null, default: gen_random_uuid())
//   created_at: timestamp with time zone (not null, default: timezone('utc'::text, now()))
//   colaborador_id: uuid (nullable)
//   data: date (not null)
//   hora_entrada: text (nullable)
//   hora_saida: text (nullable)
//   organization_id: uuid (not null)
// Table: recrutamento
//   id: uuid (not null, default: gen_random_uuid())
//   created_at: timestamp with time zone (not null, default: timezone('utc'::text, now()))
//   nome_candidato: text (not null)
//   vaga: text (not null)
//   status: text (not null)
//   image_gender: text (nullable, default: 'male'::text)
//   email: text (nullable)
//   telefone: text (nullable)
//   vaga_id: uuid (nullable)
//   curriculo_url: text (nullable)
//   organization_id: uuid (not null)
// Table: vagas
//   id: uuid (not null, default: gen_random_uuid())
//   titulo: text (not null)
//   descricao: text (nullable)
//   departamento: text (nullable)
//   requisitos: text (nullable)
//   salario: numeric (nullable)
//   tipo_contrato: text (nullable)
//   status: text (nullable, default: 'Aberta'::text)
//   created_at: timestamp with time zone (not null, default: timezone('utc'::text, now()))
//   organization_id: uuid (not null)

// --- CONSTRAINTS ---
// Table: avaliacoes
//   CHECK avaliacoes_nota_pontualidade_check: CHECK (((nota_pontualidade >= 1) AND (nota_pontualidade <= 5)))
//   CHECK avaliacoes_nota_qualidade_check: CHECK (((nota_qualidade >= 1) AND (nota_qualidade <= 5)))
//   CHECK avaliacoes_nota_trabalho_equipe_check: CHECK (((nota_trabalho_equipe >= 1) AND (nota_trabalho_equipe <= 5)))
//   FOREIGN KEY avaliacoes_organization_id_fkey: FOREIGN KEY (organization_id) REFERENCES organizations(id)
//   PRIMARY KEY avaliacoes_pkey: PRIMARY KEY (id)
//   FOREIGN KEY fk_avaliacoes_avaliador: FOREIGN KEY (avaliador_id) REFERENCES colaboradores(id) ON DELETE SET NULL
//   FOREIGN KEY fk_avaliacoes_colaborador: FOREIGN KEY (colaborador_id) REFERENCES colaboradores(id) ON DELETE CASCADE
// Table: colaboradores
//   FOREIGN KEY colaboradores_organization_id_fkey: FOREIGN KEY (organization_id) REFERENCES organizations(id)
//   PRIMARY KEY colaboradores_pkey: PRIMARY KEY (id)
//   FOREIGN KEY colaboradores_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id)
//   CHECK valid_roles: CHECK ((role = ANY (ARRAY['Admin'::text, 'Gerente'::text, 'Colaborador'::text, 'visitante'::text])))
// Table: ferias
//   FOREIGN KEY ferias_colaborador_id_fkey: FOREIGN KEY (colaborador_id) REFERENCES colaboradores(id) ON DELETE CASCADE
//   FOREIGN KEY ferias_organization_id_fkey: FOREIGN KEY (organization_id) REFERENCES organizations(id)
//   PRIMARY KEY ferias_pkey: PRIMARY KEY (id)
// Table: organizations
//   FOREIGN KEY organizations_created_by_fkey: FOREIGN KEY (created_by) REFERENCES auth.users(id)
//   PRIMARY KEY organizations_pkey: PRIMARY KEY (id)
// Table: ponto
//   FOREIGN KEY ponto_colaborador_id_fkey: FOREIGN KEY (colaborador_id) REFERENCES colaboradores(id) ON DELETE CASCADE
//   FOREIGN KEY ponto_organization_id_fkey: FOREIGN KEY (organization_id) REFERENCES organizations(id)
//   PRIMARY KEY ponto_pkey: PRIMARY KEY (id)
// Table: recrutamento
//   FOREIGN KEY recrutamento_organization_id_fkey: FOREIGN KEY (organization_id) REFERENCES organizations(id)
//   PRIMARY KEY recrutamento_pkey: PRIMARY KEY (id)
//   FOREIGN KEY recrutamento_vaga_id_fkey: FOREIGN KEY (vaga_id) REFERENCES vagas(id) ON DELETE SET NULL
// Table: vagas
//   FOREIGN KEY vagas_organization_id_fkey: FOREIGN KEY (organization_id) REFERENCES organizations(id)
//   PRIMARY KEY vagas_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: avaliacoes
//   Policy "Avaliacoes isolation" (ALL, PERMISSIVE) roles={public}
//     USING: (organization_id = get_my_org_id())
//     WITH CHECK: (organization_id = get_my_org_id())
// Table: colaboradores
//   Policy "Colaboradores isolation" (ALL, PERMISSIVE) roles={public}
//     USING: ((organization_id = get_my_org_id()) OR (user_id = auth.uid()))
//     WITH CHECK: ((organization_id = get_my_org_id()) OR (user_id = auth.uid()))
// Table: ferias
//   Policy "Ferias isolation" (ALL, PERMISSIVE) roles={public}
//     USING: (organization_id = get_my_org_id())
//     WITH CHECK: (organization_id = get_my_org_id())
// Table: organizations
//   Policy "Organizations insertable by auth users" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: (auth.role() = 'authenticated'::text)
//   Policy "Organizations viewable by members" (SELECT, PERMISSIVE) roles={public}
//     USING: ((id = get_my_org_id()) OR (created_by = auth.uid()))
// Table: ponto
//   Policy "Ponto isolation" (ALL, PERMISSIVE) roles={public}
//     USING: (organization_id = get_my_org_id())
//     WITH CHECK: (organization_id = get_my_org_id())
// Table: recrutamento
//   Policy "Public insert access for candidates" (INSERT, PERMISSIVE) roles={anon}
//     WITH CHECK: true
//   Policy "Recrutamento isolation" (ALL, PERMISSIVE) roles={public}
//     USING: (organization_id = get_my_org_id())
//     WITH CHECK: (organization_id = get_my_org_id())
// Table: vagas
//   Policy "Public read access for jobs" (SELECT, PERMISSIVE) roles={anon}
//     USING: (status = 'Aberta'::text)
//   Policy "Vagas isolation" (ALL, PERMISSIVE) roles={public}
//     USING: (organization_id = get_my_org_id())
//     WITH CHECK: (organization_id = get_my_org_id())

// --- DATABASE FUNCTIONS ---
// FUNCTION auto_assign_org_id()
//   CREATE OR REPLACE FUNCTION public.auto_assign_org_id()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//       IF NEW.organization_id IS NULL THEN
//           NEW.organization_id := public.get_my_org_id();
//       END IF;
//       RETURN NEW;
//   END;
//   $function$
//
// FUNCTION get_my_org_id()
//   CREATE OR REPLACE FUNCTION public.get_my_org_id()
//    RETURNS uuid
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     RETURN (SELECT organization_id FROM public.colaboradores WHERE user_id = auth.uid() LIMIT 1);
//   END;
//   $function$
//

// --- TRIGGERS ---
// Table: avaliacoes
//   tr_assign_org_avaliacoes: CREATE TRIGGER tr_assign_org_avaliacoes BEFORE INSERT ON public.avaliacoes FOR EACH ROW EXECUTE FUNCTION auto_assign_org_id()
// Table: colaboradores
//   tr_assign_org_colaboradores: CREATE TRIGGER tr_assign_org_colaboradores BEFORE INSERT ON public.colaboradores FOR EACH ROW EXECUTE FUNCTION auto_assign_org_id()
// Table: ferias
//   tr_assign_org_ferias: CREATE TRIGGER tr_assign_org_ferias BEFORE INSERT ON public.ferias FOR EACH ROW EXECUTE FUNCTION auto_assign_org_id()
// Table: ponto
//   tr_assign_org_ponto: CREATE TRIGGER tr_assign_org_ponto BEFORE INSERT ON public.ponto FOR EACH ROW EXECUTE FUNCTION auto_assign_org_id()
// Table: recrutamento
//   tr_assign_org_recrutamento: CREATE TRIGGER tr_assign_org_recrutamento BEFORE INSERT ON public.recrutamento FOR EACH ROW EXECUTE FUNCTION auto_assign_org_id()
// Table: vagas
//   tr_assign_org_vagas: CREATE TRIGGER tr_assign_org_vagas BEFORE INSERT ON public.vagas FOR EACH ROW EXECUTE FUNCTION auto_assign_org_id()

// --- INDEXES ---
// Table: colaboradores
//   CREATE INDEX idx_colaboradores_user_id ON public.colaboradores USING btree (user_id)
// Table: recrutamento
//   CREATE INDEX idx_recrutamento_vaga_id ON public.recrutamento USING btree (vaga_id)
