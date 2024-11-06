-- Dump do Banco de Dados realizado em 03/11/2024 às 23:45
-- Versão do MariaDB: 10.4.32 | PHP: 8.2.12
-- Ferramenta utilizada: phpMyAdmin (versão 5.2.1)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Definição do Banco de Dados
-- Banco de dados: `dsapi_database`
--

-- --------------------------------------------------------

-- Estrutura para a tabela `categorias_produtos`
--

CREATE TABLE `categorias_produtos` (
  `codigo` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Estrutura para a tabela `localidades`
--

CREATE TABLE `localidades` (
  `codigo` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Estrutura para a tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `codigo` int(11) NOT NULL,
  `nome_completo` varchar(100) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `altura_cm` double DEFAULT NULL,
  `localidade_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Estrutura para a tabela `ordens`
--

CREATE TABLE `ordens` (
  `codigo` int(11) NOT NULL,
  `data_hora` datetime DEFAULT NULL,
  `endereco_entrega` varchar(200) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Estrutura para a tabela `ordens_itens`
--

CREATE TABLE `ordens_itens` (
  `ordem_codigo` int(11) NOT NULL,
  `produto_codigo` int(11) NOT NULL,
  `preco_unitario` double DEFAULT NULL,
  `quantidade_itens` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Estrutura para a tabela `itens_produtos`
--

CREATE TABLE `itens_produtos` (
  `codigo` int(11) NOT NULL,
  `nome_produto` varchar(100) NOT NULL,
  `preco_unitario` double DEFAULT NULL,
  `estoque` double DEFAULT NULL,
  `categoria_produto_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Índices para tabelas
--

-- Índices da tabela `categorias_produtos`
ALTER TABLE `categorias_produtos`
  ADD PRIMARY KEY (`codigo`);

-- Índices da tabela `localidades`
ALTER TABLE `localidades`
  ADD PRIMARY KEY (`codigo`);

-- Índices da tabela `usuarios`
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `localidade_id_fk` (`localidade_id`);

-- Índices da tabela `ordens`
ALTER TABLE `ordens`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `usuario_id_fk` (`usuario_id`);

-- Índices da tabela `ordens_itens`
ALTER TABLE `ordens_itens`
  ADD PRIMARY KEY (`ordem_codigo`, `produto_codigo`),
  ADD KEY `produto_codigo_fk` (`produto_codigo`);

-- Índices da tabela `itens_produtos`
ALTER TABLE `itens_produtos`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `categoria_produto_id_fk` (`categoria_produto_id`);

-- --------------------------------------------------------

-- Restrições para as tabelas
--

-- Restrições para a tabela `usuarios`
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_localidade_fk` FOREIGN KEY (`localidade_id`) REFERENCES `localidades` (`codigo`);

-- Restrições para a tabela `ordens`
ALTER TABLE `ordens`
  ADD CONSTRAINT `ordens_usuario_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`codigo`);

-- Restrições para a tabela `ordens_itens`
ALTER TABLE `ordens_itens`
  ADD CONSTRAINT `ordens_itens_ordem_fk` FOREIGN KEY (`ordem_codigo`) REFERENCES `ordens` (`codigo`),
  ADD CONSTRAINT `ordens_itens_produto_fk` FOREIGN KEY (`produto_codigo`) REFERENCES `itens_produtos` (`codigo`);

-- Restrições para a tabela `itens_produtos`
ALTER TABLE `itens_produtos`
  ADD CONSTRAINT `itens_produtos_categoria_fk` FOREIGN KEY (`categoria_produto_id`) REFERENCES `categorias_produtos` (`codigo`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;