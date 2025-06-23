import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdemServico, StatusOS } from '../models/ordem-servico.model';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {
  private readonly apiUrl = 'http://localhost:3000/ordensServico';
  private http = inject(HttpClient);

  constructor() { }

  getOrdensServico(): Observable<OrdemServico[]> {
    return this.http.get<OrdemServico[]>(this.apiUrl);
  }

  updateOrdemServicoStatus(id: number, novoStatus: StatusOS): Observable<OrdemServico> {
    return this.http.patch<OrdemServico>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`, { status: novoStatus });
  }
}