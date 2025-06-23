import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { OrdemServicoService } from '../../services/ordem-servico.service';
import { OrdemServico, StatusOS, TipoServico } from '../../models/ordem-servico.model';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent implements OnInit {
  private osService = inject(OrdemServicoService);

  colunas: { [key in StatusOS]: OrdemServico[] } = {
    Agendado: [],
    'Em Progresso': [],
    Entregue: []
  };

  ngOnInit(): void {
    this.carregarOrdensServico();
  }

  carregarOrdensServico(): void {
    this.osService.getOrdensServico().subscribe(data => {
      this.colunas.Agendado = data.filter(os => os.status === 'Agendado');
      this.colunas['Em Progresso'] = data.filter(os => os.status === 'Em Progresso');
      this.colunas.Entregue = data.filter(os => os.status === 'Entregue');
    });
  }

  onDrop(event: CdkDragDrop<OrdemServico[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      const novoStatus = this.getStatusFromContainerId(event.container.id);

      this.osService.updateOrdemServicoStatus(item.id, novoStatus).subscribe(() => {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      });
    }
  }

  private getStatusFromContainerId(containerId: string): StatusOS {
    if (containerId === 'agendado') return 'Agendado';
    if (containerId === 'emProgresso') return 'Em Progresso';
    if (containerId === 'entregue') return 'Entregue';
    return 'Agendado';
  }

  getTipoServicoClass(tipo: TipoServico): string {
    if (!tipo) return '';
    return `tag-${tipo.toLowerCase()}`;
  }
}