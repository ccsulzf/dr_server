/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50722
Source Host           : localhost:3306
Source Database       : dr

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2018-12-09 20:00:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for Address
-- ----------------------------
DROP TABLE IF EXISTS `Address`;
CREATE TABLE `Address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `province` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `isCurrenLive` tinyint(4) NOT NULL DEFAULT '0',
  `memo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Address
-- ----------------------------
INSERT INTO `Address` VALUES ('1', '1', '湖南省', '长沙市', '新化县', '0', null, '2018-12-08 13:08:59', '2018-12-08 13:09:02', null);

-- ----------------------------
-- Table structure for CreditAccount
-- ----------------------------
DROP TABLE IF EXISTS `CreditAccount`;
CREATE TABLE `CreditAccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fundAccountId` int(11) NOT NULL,
  `creditAmount` float(11,0) NOT NULL,
  `usedAmount` float(11,0) NOT NULL,
  `repaymentDay` varchar(50) NOT NULL,
  `billDay` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of CreditAccount
-- ----------------------------
INSERT INTO `CreditAccount` VALUES ('1', '1', '2000', '200', '2018-12-09', '2018-12-09', '2018-12-09 18:54:12', '2018-12-09 18:54:14', null);

-- ----------------------------
-- Table structure for ExpenseBook
-- ----------------------------
DROP TABLE IF EXISTS `ExpenseBook`;
CREATE TABLE `ExpenseBook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `memo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ExpenseBook
-- ----------------------------
INSERT INTO `ExpenseBook` VALUES ('1', '1', '一日三餐', '123', '2018-12-07 19:09:33', '2018-12-07 19:09:33', null);
INSERT INTO `ExpenseBook` VALUES ('2', '1', '生活其他', '234', '2018-12-07 19:19:01', '2018-12-07 19:19:01', null);

-- ----------------------------
-- Table structure for ExpenseCategory
-- ----------------------------
DROP TABLE IF EXISTS `ExpenseCategory`;
CREATE TABLE `ExpenseCategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expenseBookId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `memo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ExpenseCategory
-- ----------------------------
INSERT INTO `ExpenseCategory` VALUES ('1', '1', '123', '', '2018-12-09 14:21:22', '2018-12-09 14:21:22', null);
INSERT INTO `ExpenseCategory` VALUES ('2', '1', '234', '', '2018-12-09 15:17:21', '2018-12-09 15:17:21', null);
INSERT INTO `ExpenseCategory` VALUES ('3', '1', '456', '', '2018-12-09 15:19:02', '2018-12-09 15:19:02', null);

-- ----------------------------
-- Table structure for FundAccount
-- ----------------------------
DROP TABLE IF EXISTS `FundAccount`;
CREATE TABLE `FundAccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fundWayId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `amount` float(11,0) NOT NULL,
  `name` varchar(255) NOT NULL,
  `isCredit` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of FundAccount
-- ----------------------------
INSERT INTO `FundAccount` VALUES ('1', '2', '1', '100', '123', '1', '2018-12-09 18:51:19', '2018-12-09 18:51:20', null);

-- ----------------------------
-- Table structure for FundParty
-- ----------------------------
DROP TABLE IF EXISTS `FundParty`;
CREATE TABLE `FundParty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of FundParty
-- ----------------------------
INSERT INTO `FundParty` VALUES ('1', '1', '123', '1', '1', '', '2018-12-09 15:29:05', '2018-12-09 15:29:08', null);
INSERT INTO `FundParty` VALUES ('2', '1', '测试', '1', '1', '12', '2018-12-09 15:39:57', '2018-12-09 15:39:57', null);

-- ----------------------------
-- Table structure for FundWay
-- ----------------------------
DROP TABLE IF EXISTS `FundWay`;
CREATE TABLE `FundWay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of FundWay
-- ----------------------------
INSERT INTO `FundWay` VALUES ('1', '1', '支付宝', null, '2', '2018-12-09 17:46:51', '2018-12-09 17:46:51', null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', 'ccsu_lzf@163.com', '123456', '2018-12-07 16:19:16', '2018-12-07 16:19:18', null);
