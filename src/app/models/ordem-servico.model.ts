export type StatusOS = 'Agendado' | 'Em Progresso' | 'Entregue';
export type TipoServico = 'Seguradora' | 'Retorno' | 'Bloqueado' | null;

export interface OrdemServico {
  id: number;
  cliente: string;
  veiculo: string;
  descricao: string;
  status: StatusOS;
  tipoServico: TipoServico;
}