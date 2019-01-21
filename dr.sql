/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50622
Source Host           : localhost:3306
Source Database       : dr

Target Server Type    : MYSQL
Target Server Version : 50622
File Encoding         : 65001

Date: 2019-01-22 06:23:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
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
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('1', '1', '湖南省', '长沙市', '新化县', '0', null, '2018-12-08 13:08:59', '2018-12-08 13:09:02', null);

-- ----------------------------
-- Table structure for creditaccount
-- ----------------------------
DROP TABLE IF EXISTS `creditaccount`;
CREATE TABLE `creditaccount` (
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of creditaccount
-- ----------------------------
INSERT INTO `creditaccount` VALUES ('2', '9', '200', '0', '2018-12-02', '2018-12-01', '2018-12-10 21:51:43', '2018-12-10 21:51:43', null);

-- ----------------------------
-- Table structure for expense
-- ----------------------------
DROP TABLE IF EXISTS `expense`;
CREATE TABLE `expense` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `expenseBookId` int(11) NOT NULL,
  `expenseDate` date NOT NULL,
  `totalAmount` float(11,3) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expense
-- ----------------------------
INSERT INTO `expense` VALUES ('12', '1', '1', '2019-01-15', '123.000', '2019-01-15 21:00:14', '2019-01-15 21:00:14', null);
INSERT INTO `expense` VALUES ('13', '1', '1', '2019-01-19', '936.000', '2019-01-19 13:17:15', '2019-01-19 19:16:05', null);
INSERT INTO `expense` VALUES ('14', '1', '2', '2019-01-19', '123.000', '2019-01-19 19:19:22', '2019-01-19 19:19:22', null);

-- ----------------------------
-- Table structure for expensebook
-- ----------------------------
DROP TABLE IF EXISTS `expensebook`;
CREATE TABLE `expensebook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `memo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expensebook
-- ----------------------------
INSERT INTO `expensebook` VALUES ('1', '1', '一日三餐', '123', '2018-12-07 19:09:33', '2018-12-07 19:09:33', null);
INSERT INTO `expensebook` VALUES ('2', '1', '生活其他', '234', '2018-12-07 19:19:01', '2018-12-07 19:19:01', null);

-- ----------------------------
-- Table structure for expensecategory
-- ----------------------------
DROP TABLE IF EXISTS `expensecategory`;
CREATE TABLE `expensecategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expenseBookId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `memo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expensecategory
-- ----------------------------
INSERT INTO `expensecategory` VALUES ('1', '1', '123', '', '2018-12-09 14:21:22', '2018-12-09 14:21:22', null);
INSERT INTO `expensecategory` VALUES ('2', '1', '234', '', '2018-12-09 15:17:21', '2018-12-09 15:17:21', null);
INSERT INTO `expensecategory` VALUES ('3', '1', '456', '', '2018-12-09 15:19:02', '2018-12-09 15:19:02', null);
INSERT INTO `expensecategory` VALUES ('4', '2', '零食水果', '', '2019-01-19 19:17:53', '2019-01-19 19:17:53', null);

-- ----------------------------
-- Table structure for expensedetail
-- ----------------------------
DROP TABLE IF EXISTS `expensedetail`;
CREATE TABLE `expensedetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expenseId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `amount` float(11,3) NOT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `fundPartyId` int(11) NOT NULL,
  `addressId` int(11) NOT NULL,
  `expenseCategoryId` int(11) NOT NULL DEFAULT '0',
  `fundWayId` int(11) NOT NULL,
  `fundAccountId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expensedetail
-- ----------------------------
INSERT INTO `expensedetail` VALUES ('8', '12', '123', '123.000', null, '1', '1', '1', '1', '6', '2019-01-15 21:00:14', '2019-01-15 21:00:14', null);
INSERT INTO `expensedetail` VALUES ('9', '13', '123', '123.000', '123123', '1', '1', '1', '1', '6', '2019-01-19 13:17:16', '2019-01-19 13:17:16', null);
INSERT INTO `expensedetail` VALUES ('10', '13', '123', '123.000', '123', '1', '1', '1', '1', '6', '2019-01-19 13:30:39', '2019-01-19 13:30:39', null);
INSERT INTO `expensedetail` VALUES ('11', '13', '234', '456.000', '123', '1', '1', '2', '1', '6', '2019-01-19 13:43:42', '2019-01-19 13:43:42', null);
INSERT INTO `expensedetail` VALUES ('12', '13', '234', '234.000', null, '1', '1', '1', '1', '6', '2019-01-19 19:16:05', '2019-01-19 19:16:05', null);
INSERT INTO `expensedetail` VALUES ('13', '14', '测试', '123.000', null, '1', '1', '4', '1', '6', '2019-01-19 19:19:22', '2019-01-19 19:19:22', null);

-- ----------------------------
-- Table structure for expensedetaillabel
-- ----------------------------
DROP TABLE IF EXISTS `expensedetaillabel`;
CREATE TABLE `expensedetaillabel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `labelId` int(11) NOT NULL,
  `expenseDetailId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expensedetaillabel
-- ----------------------------
INSERT INTO `expensedetaillabel` VALUES ('1', '1', '9', '2019-01-19 13:17:16', '2019-01-19 13:17:16', null);
INSERT INTO `expensedetaillabel` VALUES ('2', '1', '10', '2019-01-19 13:30:39', '2019-01-19 13:30:39', null);
INSERT INTO `expensedetaillabel` VALUES ('3', '1', '11', '2019-01-19 13:43:42', '2019-01-19 13:43:42', null);

-- ----------------------------
-- Table structure for expensedetailparticipant
-- ----------------------------
DROP TABLE IF EXISTS `expensedetailparticipant`;
CREATE TABLE `expensedetailparticipant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expenseDetailId` int(11) NOT NULL,
  `participantId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expensedetailparticipant
-- ----------------------------
INSERT INTO `expensedetailparticipant` VALUES ('6', '8', '1', '2019-01-15 21:00:14', '2019-01-15 21:00:14', null);
INSERT INTO `expensedetailparticipant` VALUES ('7', '9', '1', '2019-01-19 13:17:16', '2019-01-19 13:17:16', null);
INSERT INTO `expensedetailparticipant` VALUES ('8', '10', '1', '2019-01-19 13:30:39', '2019-01-19 13:30:39', null);
INSERT INTO `expensedetailparticipant` VALUES ('9', '12', '1', '2019-01-19 19:16:05', '2019-01-19 19:16:05', null);
INSERT INTO `expensedetailparticipant` VALUES ('10', '13', '1', '2019-01-19 19:19:24', '2019-01-19 19:19:24', null);

-- ----------------------------
-- Table structure for fundaccount
-- ----------------------------
DROP TABLE IF EXISTS `fundaccount`;
CREATE TABLE `fundaccount` (
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fundaccount
-- ----------------------------
INSERT INTO `fundaccount` VALUES ('6', '1', '1', '0', '测试', '0', '2018-12-10 21:49:11', '2018-12-10 21:49:11', null);
INSERT INTO `fundaccount` VALUES ('7', '1', '1', '0', '测试2', '0', '2018-12-10 21:49:49', '2018-12-10 21:49:49', null);
INSERT INTO `fundaccount` VALUES ('9', '1', '1', '0', '测试3', '1', '2018-12-10 21:51:43', '2018-12-10 21:51:43', null);

-- ----------------------------
-- Table structure for fundparty
-- ----------------------------
DROP TABLE IF EXISTS `fundparty`;
CREATE TABLE `fundparty` (
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
-- Records of fundparty
-- ----------------------------
INSERT INTO `fundparty` VALUES ('1', '1', '123', '1', '1', '', '2018-12-09 15:29:05', '2018-12-09 15:29:08', null);
INSERT INTO `fundparty` VALUES ('2', '1', '测试', '1', '1', '12', '2018-12-09 15:39:57', '2018-12-09 15:39:57', null);

-- ----------------------------
-- Table structure for fundway
-- ----------------------------
DROP TABLE IF EXISTS `fundway`;
CREATE TABLE `fundway` (
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
-- Records of fundway
-- ----------------------------
INSERT INTO `fundway` VALUES ('1', '1', '支付宝', null, '2', '2018-12-09 17:46:51', '2018-12-09 17:46:51', null);

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `useCount` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES ('1', '1', '234', '1', '0', '2018-12-29 21:30:10', '2018-12-29 21:30:10', null);

-- ----------------------------
-- Table structure for participant
-- ----------------------------
DROP TABLE IF EXISTS `participant`;
CREATE TABLE `participant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `memo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of participant
-- ----------------------------
INSERT INTO `participant` VALUES ('1', '1', '测试', 'test', '123123', '2018-12-15 16:15:37', '2018-12-15 16:15:37', null);
INSERT INTO `participant` VALUES ('2', '1', '测试2', '测试2', '', '2018-12-15 22:17:01', '2018-12-15 22:17:01', null);

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
