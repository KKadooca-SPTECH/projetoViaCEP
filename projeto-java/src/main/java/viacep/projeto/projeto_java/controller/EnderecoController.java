package viacep.projeto.projeto_java.controller;

import viacep.projeto.projeto_java.model.EnderecoModel;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

@RestController
@RequestMapping("/enderecos")
@CrossOrigin
public class EnderecoController {

    private final JdbcTemplate jdbcTemplate;

    public EnderecoController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostMapping
    public ResponseEntity<Void> cadastrar(@RequestBody EnderecoModel endereco) {

        String sqlVerificar = "SELECT COUNT(*) FROM endereco WHERE cep = ? AND numero = ? AND rua = ? AND cidade = ? AND estado = ? AND pais = ? AND data = ? AND tipo_endereco = ? AND tem_complemento = ? AND COALESCE(tipo_complemento, '') = ? AND COALESCE(complemento, '') = ?";

        Integer quantidade = jdbcTemplate.queryForObject(
                sqlVerificar,
                Integer.class,
                endereco.getCep(),
                endereco.getNumero(),
                endereco.getRua(),
                endereco.getCidade(),
                endereco.getEstado(),
                endereco.getPais(),
                endereco.getData(),
                endereco.getTipoEndereco(),
                endereco.getTemComplemento(),
                endereco.getTipoComplemento(),
                endereco.getComplemento()
        );

        if (quantidade > 0) {
            return ResponseEntity.status(400).build();
        }

        String sql = "INSERT INTO endereco (cep, numero, rua, cidade, estado, pais, data, tipo_endereco, tem_complemento, tipo_complemento, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(
                sql,
                endereco.getCep(),
                endereco.getNumero(),
                endereco.getRua(),
                endereco.getCidade(),
                endereco.getEstado(),
                endereco.getPais(),
                endereco.getData(),
                endereco.getTipoEndereco(),
                endereco.getTemComplemento(),
                endereco.getTipoComplemento(),
                endereco.getComplemento()
        );

        return ResponseEntity.status(201).build();
    }

    @GetMapping
    public ResponseEntity<List<EnderecoModel>> listar() {

        String sql = "SELECT * FROM endereco";

        List<EnderecoModel> enderecos = jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(EnderecoModel.class)
        );

        return ResponseEntity.ok(enderecos);
    }

    @GetMapping("/tipos-complemento")
    public ResponseEntity<List<String>> listarTiposComplemento() {

        List<String> tipos = List.of(
                "Apartamento",
                "Casa",
                "Sala"
        );

        return ResponseEntity.ok(tipos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Integer id) {
        String sql = "DELETE FROM endereco WHERE id = ?";

        int quantidade = jdbcTemplate.update(sql, id);

        if (quantidade == 0) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(204).build();
    }
}