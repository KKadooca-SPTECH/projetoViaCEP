package viacep.projeto.projeto_java.model;

public class EnderecoModel {

    private Integer id;
    private String cep;
    private String numero;
    private String rua;
    private String cidade;
    private String estado;
    private String pais;
    private String data;
    private String tipoEndereco;
    private Boolean temComplemento;
    private String tipoComplemento;
    private String complemento;

    public EnderecoModel() {
    }

    public EnderecoModel(Integer id, String cep, String numero, String rua,
                         String cidade, String estado, String pais, String data,
                         String tipoEndereco, Boolean temComplemento, String tipoComplemento,
                         String complemento) {
        this.id = id;
        this.cep = cep;
        this.numero = numero;
        this.rua = rua;
        this.cidade = cidade;
        this.estado = estado;
        this.pais = pais;
        this.data = data;
        this.tipoEndereco = tipoEndereco;
        this.temComplemento = temComplemento;
        this.tipoComplemento = tipoComplemento;
        this.complemento = complemento;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getTipoEndereco() {
        return tipoEndereco;
    }

    public void setTipoEndereco(String tipoEndereco) {
        this.tipoEndereco = tipoEndereco;
    }

    public Boolean getTemComplemento() {
        return temComplemento;
    }

    public void setTemComplemento(Boolean temComplemento) {
        this.temComplemento = temComplemento;
    }

    public String getTipoComplemento() {
        return tipoComplemento;
    }

    public void setTipoComplemento(String tipoComplemento) {
        this.tipoComplemento = tipoComplemento;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }
}