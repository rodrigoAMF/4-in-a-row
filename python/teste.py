from QuatroEmLinha import QuatroEmLinha

jogo = QuatroEmLinha()
jogo.estado_atual.carrega_sequencia_jogadas("614657", 1)
jogo.estado_atual.jogar(2)
jogo.estado_atual.jogar(6)
jogo.printa_bits(jogo.estado_atual.tabuleiro[jogo.estado_atual.turno_atual & 1])
jogo.estado_atual.eh_jogada_vitoriosa(2)
'''jogo.estado_atual.jogar(0)
jogo.estado_atual.jogar(0)
jogo.estado_atual.jogar(0)
jogo.estado_atual.jogar(0)
jogo.estado_atual.jogar(0)
jogo.estado_atual.jogar(0)
jogo.estado_atual.desfazer_jogada()

jogo.printa_bits((jogo.estado_atual.tabuleiro[0] ^ jogo.estado_atual.tabuleiro[1]) & jogo.estado_atual.top_mask(0))
'''
pontuacao, coluna_para_jogar = jogo.encontrar_solucao()
