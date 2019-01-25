/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50722
Source Host           : localhost:3306
Source Database       : dr

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2019-01-25 17:40:30
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('2', '1', '湖南省', '长沙市', '', '1', null, '2019-01-22 10:04:59', '2019-01-22 10:04:59', null);

-- ----------------------------
-- Table structure for creditaccount
-- ----------------------------
DROP TABLE IF EXISTS `creditaccount`;
CREATE TABLE `creditaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fundAccountId` int(11) NOT NULL,
  `creditAmount` float(11,2) NOT NULL,
  `usedAmount` float(11,2) NOT NULL,
  `repaymentDay` varchar(50) NOT NULL,
  `billDay` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of creditaccount
-- ----------------------------

-- ----------------------------
-- Table structure for expense
-- ----------------------------
DROP TABLE IF EXISTS `expense`;
CREATE TABLE `expense` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `expenseBookId` int(11) NOT NULL,
  `expenseDate` date NOT NULL,
  `totalAmount` float(11,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expense
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expensebook
-- ----------------------------
INSERT INTO `expensebook` VALUES ('3', '1', '一日三餐', '记录日常的一日三餐', '2019-01-22 10:04:45', '2019-01-22 10:04:45', null);
INSERT INTO `expensebook` VALUES ('4', '1', '文具书籍', '', '2019-01-22 15:48:58', '2019-01-22 15:48:58', null);

-- ----------------------------
-- Table structure for expensecategory
-- ----------------------------
DROP TABLE IF EXISTS `expensecategory`;
CREATE TABLE `expensecategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expenseBookId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `memo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expensecategory
-- ----------------------------
INSERT INTO `expensecategory` VALUES ('4', '2', '1', '零食水果', '', '2019-01-19 19:17:53', '2019-01-19 19:17:53', null);
INSERT INTO `expensecategory` VALUES ('5', '3', '1', '早餐', '', '2019-01-22 10:05:11', '2019-01-22 10:05:11', null);
INSERT INTO `expensecategory` VALUES ('6', '4', '1', '书籍', '', '2019-01-22 15:49:48', '2019-01-22 15:49:48', null);
INSERT INTO `expensecategory` VALUES ('7', '3', '1', '买菜', '', '2019-01-22 15:51:09', '2019-01-22 15:51:09', null);

-- ----------------------------
-- Table structure for expensedetail
-- ----------------------------
DROP TABLE IF EXISTS `expensedetail`;
CREATE TABLE `expensedetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expenseId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `amount` float(11,2) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expensedetail
-- ----------------------------
INSERT INTO `expensedetail` VALUES ('62', '56', '馒头', '3.00', null, '3', '2', '5', '2', '19', '2019-01-25 11:06:36', '2019-01-25 11:06:40', null);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expensedetaillabel
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of expensedetailparticipant
-- ----------------------------
INSERT INTO `expensedetailparticipant` VALUES ('75', '62', '1', '2019-01-25 11:06:40', '2019-01-25 11:06:40', null);

-- ----------------------------
-- Table structure for fundaccount
-- ----------------------------
DROP TABLE IF EXISTS `fundaccount`;
CREATE TABLE `fundaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fundWayId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `balance` float(11,2) NOT NULL,
  `name` varchar(255) NOT NULL,
  `isCredit` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fundaccount
-- ----------------------------
INSERT INTO `fundaccount` VALUES ('19', '2', '1', '97.00', '余额', '0', '2019-01-25 10:58:07', '2019-01-25 11:06:40', null);

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fundparty
-- ----------------------------
INSERT INTO `fundparty` VALUES ('3', '1', '大米先生', '2', '1', null, '2019-01-22 10:05:36', '2019-01-22 10:05:36', null);
INSERT INTO `fundparty` VALUES ('4', '1', '新佳宜', '2', '1', null, '2019-01-22 10:05:55', '2019-01-22 10:05:55', null);
INSERT INTO `fundparty` VALUES ('5', '1', '京东', '2', '1', null, '2019-01-22 15:50:01', '2019-01-22 15:50:01', null);
INSERT INTO `fundparty` VALUES ('6', '1', '三利粮油', '1', '1', '菜市场', '2019-01-22 15:52:37', '2019-01-22 15:52:37', null);
INSERT INTO `fundparty` VALUES ('7', '1', '菜市场', '1', '1', '代表所有的菜市场的个人卖主', '2019-01-22 15:58:44', '2019-01-22 15:58:44', null);
INSERT INTO `fundparty` VALUES ('8', '1', '珊珊便利店', '2', '1', null, '2019-01-23 10:18:01', '2019-01-23 10:18:01', null);
INSERT INTO `fundparty` VALUES ('9', '1', '京东', '2', '1', null, '2019-01-24 17:40:32', '2019-01-24 17:40:32', null);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fundway
-- ----------------------------
INSERT INTO `fundway` VALUES ('2', '1', '支付宝', null, '2', '2019-01-22 10:06:15', '2019-01-22 10:06:15', null);
INSERT INTO `fundway` VALUES ('3', '1', '微信', null, '2', '2019-01-22 15:52:49', '2019-01-22 15:52:49', null);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of label
-- ----------------------------

-- ----------------------------
-- Table structure for participant
-- ----------------------------
DROP TABLE IF EXISTS `participant`;
CREATE TABLE `participant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `isMySelf` tinyint(2) NOT NULL DEFAULT '0',
  `memo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of participant
-- ----------------------------
INSERT INTO `participant` VALUES ('1', '1', '李志锋', '', '1', '', '2019-01-23 10:09:52', '2019-01-23 10:09:52', null);

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
